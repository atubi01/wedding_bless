import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Clock, MapPin, User, MessageCircle, Heart, Search, SortDesc, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [showSortMenu, setShowSortMenu] = useState(false);

    const MotionCard = motion.div;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const sortOptions = [
        { id: 'newest', label: 'החדש ביותר', icon: <Clock className="w-4 h-4" /> },
        { id: 'oldest', label: 'הישן ביותר', icon: <Clock className="w-4 h-4" /> },
        { id: 'name', label: 'לפי שם', icon: <User className="w-4 h-4" /> },
    ];

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const q = query(collection(db, 'wedding-submissions'), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);
                const submissionsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: new Date(doc.data().timestamp).toLocaleDateString('he-IL'),
                    timestamp: doc.data().timestamp
                }));
                setSubmissions(submissionsData);
                setFilteredSubmissions(submissionsData);
            } catch (err) {
                setError('אירעה שגיאה בטעינת הנתונים');
                console.error('Error fetching submissions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    useEffect(() => {
        let sorted = [...submissions];

        // Apply search filter
        if (searchTerm) {
            sorted = sorted.filter(submission => {
                const searchString = searchTerm.toLowerCase();
                return (
                    submission.text?.toLowerCase().includes(searchString) ||
                    submission.name?.toLowerCase().includes(searchString) ||
                    submission.address?.toLowerCase().includes(searchString)
                );
            });
        }

        // Apply sorting
        switch (sortOption) {
            case 'oldest':
                sorted.sort((a, b) => a.timestamp - b.timestamp);
                break;
            case 'name':
                sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            case 'newest':
            default:
                sorted.sort((a, b) => b.timestamp - a.timestamp);
                break;
        }

        setFilteredSubmissions(sorted);
    }, [searchTerm, submissions, sortOption]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-16 h-16 relative">
                    <Heart className="w-16 h-16 text-rose-500 animate-pulse" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white" dir="rtl">
            <div className="relative py-12 text-center mb-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                <h1 className="text-4xl font-serif text-gray-800 mb-2">ברכות ואיחולים</h1>
                <p className="text-rose-500 font-light">שתפו באהבה ובשמחה</p>

                <div className="max-w-3xl mx-auto mt-6 flex flex-wrap gap-4 justify-center items-center px-4">
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="חיפוש ברכות..."
                            className="w-full px-4 py-2 pr-10 rounded-full border border-rose-200 focus:outline-none focus:border-rose-400 bg-white/80 backdrop-blur-sm"
                        />
                        <Search className="absolute right-3 top-2.5 w-5 h-5 text-rose-400" />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-white rounded-full border border-rose-200 hover:border-rose-400 transition-colors"
                        >
                            <SortDesc className="w-4 h-4 text-rose-400" />
                            <span>מיון</span>
                            <ChevronDown className="w-4 h-4 text-rose-400" />
                        </button>

                        <AnimatePresence>
                            {showSortMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-rose-100 z-10"
                                >
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSortOption(option.id);
                                                setShowSortMenu(false);
                                            }}
                                            className={`w-full px-4 py-2 flex items-center space-x-2 space-x-reverse hover:bg-rose-50 transition-colors ${
                                                sortOption === option.id ? 'text-rose-500 bg-rose-50' : 'text-gray-700'
                                            }`}
                                        >
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {searchTerm && (
                        <div className="w-full text-sm text-gray-500">
                            נמצאו {filteredSubmissions.length} תוצאות
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    key={sortOption}
                >
                    <AnimatePresence>
                        {filteredSubmissions.map((submission, index) => (
                            <MotionCard
                                key={submission.id}
                                layoutId={submission.id}
                                variants={cardVariants}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-rose-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.05
                                }}
                            >
                                {submission.mediaUrl && (
                                    <div className="relative h-48 bg-gray-100">
                                        {submission.mediaType === 'video' ? (
                                            <video
                                                src={submission.mediaUrl}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        ) : (
                                            <img
                                                src={submission.mediaUrl}
                                                alt="תמונה מצורפת"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                )}

                                <motion.div
                                    className="p-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 + 0.2 }}
                                >
                                    <div className="flex items-center space-x-2 space-x-reverse mb-3">
                                        <User className="w-5 h-5 text-rose-400" />
                                        <h3 className="font-serif text-xl text-gray-800">{submission.name}</h3>
                                    </div>

                                    <div className="flex items-center space-x-2 space-x-reverse mb-2 text-gray-600">
                                        <MapPin className="w-4 h-4 text-rose-400" />
                                        <p className="text-sm">{submission.address}</p>
                                    </div>

                                    <div className="flex items-center space-x-2 space-x-reverse mb-4 text-gray-600">
                                        <Clock className="w-4 h-4 text-rose-400" />
                                        <p className="text-sm">{submission.date}</p>
                                    </div>

                                    <div className="pt-4 border-t border-rose-100">
                                        <div className="flex items-start space-x-2 space-x-reverse">
                                            <MessageCircle className="w-4 h-4 text-rose-400 mt-1" />
                                            <p className="text-gray-700 whitespace-pre-wrap text-sm">
                                                {submission.text}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </MotionCard>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredSubmissions.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Heart className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-light">
                            {searchTerm ? 'לא נמצאו תוצאות לחיפוש' : 'טרם נוספו ברכות'}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
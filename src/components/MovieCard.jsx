import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, Clock, Film, Award, Users, X, Play } from 'lucide-react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const MovieSearchApp = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchType, setSearchType] = useState('movie');

  // Free OMDB API key , 
  const API_KEY = 'f7bb316x';

  // Initialize AOS on component mount
  useEffect(() => {
    // Add AOS CSS
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
    document.head.appendChild(aosCSS);

    // Add AOS JS
    const aosJS = document.createElement('script');
    aosJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
    aosJS.onload = () => {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    };
    document.head.appendChild(aosJS);

    return () => {
      document.head.removeChild(aosCSS);
      document.head.removeChild(aosJS);
    };
  }, []);

  // Search for movies
  const searchMovies = async (query, type = 'movie') => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=${type}`
      );
      
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Get detailed movie information
  const getMovieDetails = async (imdbID) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      
      const data = await response.json();
      
      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError('Failed to fetch movie details');
      }
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm, searchType);
  };

  // Popular movies to show initially
  useEffect(() => {
    searchMovies('avengers', 'movie');
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    hero: {
      background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },
    heroTitle: {
      fontSize: '4rem',
      fontWeight: '700',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      opacity: 0.9,
      marginBottom: '40px',
      fontWeight: '300'
    },
    searchContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: '50px',
      padding: '8px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    searchInput: {
      flex: 1,
      padding: '16px 24px',
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      backgroundColor: 'transparent',
      color: '#333'
    },
    searchSelect: {
      padding: '16px 20px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontSize: '16px',
      color: '#666',
      cursor: 'pointer'
    },
    searchButton: {
      padding: '16px 32px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '60px 20px'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '40px',
      color: 'white',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    moviesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '30px',
      padding: '20px 0'
    },
    movieCard: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      position: 'relative'
    },
    movieCardHover: {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
    },
    moviePoster: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      transition: 'transform 0.4s ease'
    },
    movieInfo: {
      padding: '20px'
    },
    movieTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#333'
    },
    movieYear: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600'
    },
    movieType: {
      color: '#666',
      fontSize: '14px',
      textTransform: 'capitalize',
      fontWeight: '500'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '25px',
      maxWidth: '1000px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
      animation: 'modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    modalHeader: {
      position: 'relative',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '30px',
      borderRadius: '25px 25px 0 0'
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white'
    },
    modalBody: {
      display: 'flex',
      gap: '30px',
      padding: '30px'
    },
    modalPoster: {
      width: '300px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    modalDetails: {
      flex: 1
    },
    modalTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#333'
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    plotSection: {
      marginBottom: '25px'
    },
    sectionHeading: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#333'
    },
    plotText: {
      lineHeight: 1.6,
      color: '#555',
      fontSize: '16px'
    },
    loading: {
      textAlign: 'center',
      padding: '80px 20px',
      color: 'white'
    },
    loadingSpinner: {
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255,255,255,0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px'
    },
    error: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#dc2626',
      padding: '20px',
      borderRadius: '15px',
      margin: '20px 0',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },
    noResults: {
      textAlign: 'center',
      padding: '80px 20px',
      color: 'white'
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes modalSlideIn {
        0% {
          opacity: 0;
          transform: scale(0.8) translateY(100px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .movie-card-hover:hover {
        transform: translateY(-10px) scale(1.02) !important;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3) !important;
      }
      
      .movie-card-hover:hover img {
        transform: scale(1.1);
      }
      
      .search-button-hover:hover {
        background: linear-gradient(45deg, #667eea, #764ba2) !important;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
      }
      
      .close-button-hover:hover {
        background: rgba(255,255,255,0.4) !important;
        transform: scale(1.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div data-aos="fade-down">
          <h1 style={styles.heroTitle}>CinemaSearch</h1>
          <p style={styles.heroSubtitle}>Discover movies, TV shows, and more</p>
        </div>
        
        <div style={styles.searchContainer} data-aos="fade-up" data-aos-delay="200">
          <div style={styles.searchBox}>
            <Search style={{ marginLeft: '20px', color: '#666' }} size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies, TV shows, episodes..."
              style={styles.searchInput}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              style={styles.searchSelect}
            >
              <option value="">All</option>
              <option value="movie">Movies</option>
              <option value="series">TV Series</option>
              <option value="episode">Episodes</option>
            </select>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={styles.searchButton}
              className="search-button-hover"
            >
              <Play size={18} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Error Message */}
        {error && (
          <div style={styles.error} data-aos="fade-in">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={styles.loading} data-aos="fade-in">
            <div style={styles.loadingSpinner}></div>
            <p style={{ fontSize: '1.2rem' }}>Searching for amazing content...</p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div>
            <h2 style={styles.sectionTitle} data-aos="fade-right">
              Discover Amazing Content ({movies.length} found)
            </h2>
            <div style={styles.moviesGrid}>
              {movies.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  style={styles.movieCard}
                  className="movie-card-hover"
                  onClick={() => getMovieDetails(movie.imdbID)}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div style={styles.movieYear}>{movie.Year}</div>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={movie.Title}
                    style={styles.moviePoster}
                  />
                  <div style={styles.movieInfo}>
                    <h3 style={styles.movieTitle}>{movie.Title}</h3>
                    <p style={styles.movieType}>{movie.Type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && movies.length === 0 && searchTerm && !error && (
          <div style={styles.noResults} data-aos="fade-in">
            <Film size={80} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No content found</h3>
            <p style={{ opacity: 0.8 }}>Try searching with different keywords</p>
          </div>
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div style={styles.modal} onClick={() => setSelectedMovie(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <button
                onClick={() => setSelectedMovie(null)}
                style={styles.closeButton}
                className="close-button-hover"
              >
                <X size={20} />
              </button>
              <h1 style={styles.modalTitle}>{selectedMovie.Title}</h1>
            </div>
            
            <div style={styles.modalBody}>
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={selectedMovie.Title}
                style={styles.modalPoster}
              />
              
              <div style={styles.modalDetails}>
                <div style={styles.detailsGrid}>
                  <div style={styles.detailItem}>
                    <Star size={20} style={{ color: '#fbbf24' }} />
                    <div>
                      <strong>Rating:</strong> {selectedMovie.imdbRating}/10
                    </div>
                  </div>
                  
                  <div style={styles.detailItem}>
                    <Calendar size={20} style={{ color: '#3b82f6' }} />
                    <div>
                      <strong>Year:</strong> {selectedMovie.Year}
                    </div>
                  </div>
                  
                  <div style={styles.detailItem}>
                    <Clock size={20} style={{ color: '#10b981' }} />
                    <div>
                      <strong>Runtime:</strong> {selectedMovie.Runtime}
                    </div>
                  </div>
                  
                  <div style={styles.detailItem}>
                    <Film size={20} style={{ color: '#8b5cf6' }} />
                    <div>
                      <strong>Genre:</strong> {selectedMovie.Genre}
                    </div>
                  </div>
                </div>
                
                <div style={styles.plotSection}>
                  <h3 style={styles.sectionHeading}>Plot</h3>
                  <p style={styles.plotText}>{selectedMovie.Plot}</p>
                </div>
                
                <div style={styles.plotSection}>
                  <h3 style={styles.sectionHeading}>Cast & Crew</h3>
                  <p style={styles.plotText}>
                    <strong>Director:</strong> {selectedMovie.Director}<br/>
                    <strong>Writer:</strong> {selectedMovie.Writer}<br/>
                    <strong>Actors:</strong> {selectedMovie.Actors}
                  </p>
                </div>
                
                {selectedMovie.Awards && selectedMovie.Awards !== 'N/A' && (
                  <div style={styles.plotSection}>
                    <h3 style={styles.sectionHeading}>
                      <Award size={20} style={{ color: '#fbbf24', marginRight: '8px' }} />
                      Awards
                    </h3>
                    <p style={styles.plotText}>{selectedMovie.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchApp;
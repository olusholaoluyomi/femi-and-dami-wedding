<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wedding Hero Section</title>
    <script src="https://unpkg.com/lucide-react@0.263.1/dist/index.umd.js"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            color: #5C4B37;
            background-color: #F8F4E9;
        }
        
        .hero-section {
            position: relative;
            min-height: 100vh;
            background: linear-gradient(135deg, #F8F4E9 0%, #E3DAC9 50%, #F8F4E9 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 20px;
        }
        
        /* Decorative elements */
        .golden-swirl {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='%23D4AF37' fill-opacity='0.2' d='M50,15 C60,15 70,20 75,30 C80,40 78,50 75,60 C72,70 65,75 60,80 C55,85 50,85 45,85 C40,85 35,80 30,75 C25,70 20,65 15,60 C10,55 10,50 10,45 C10,40 15,35 20,30 C25,25 30,20 35,15 C40,10 45,10 50,15 Z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
        }
        
        .golden-swirl-2 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='%23D4AF37' fill-opacity='0.15' d='M50,20 C60,20 70,25 75,35 C80,45 78,55 75,65 C72,75 65,80 60,85 C55,90 50,90 45,90 C40,90 35,85 30,80 C25,75 20,70 15,65 C10,60 10,55 10,50 C10,45 15,40 20,35 C25,30 30,25 35,20 C40,15 45,15 50,20 Z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
        }
        
        .organic-shape {
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        
        .organic-shape-2 {
            clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
        
        /* Main content */
        .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .heart-icon {
            width: 48px;
            height: 48px;
            color: #D4AF37;
            margin: 0 auto 24px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.7; transform: scale(1); }
        }
        
        .image-container {
            width: 280px;
            height: 280px;
            margin: 0 auto 32px;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(227, 218, 201, 0.3) 100%);
            border-radius: 50%;
            border: 4px solid rgba(212, 175, 55, 0.3);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .couple-image {
            width: 90%;
            height: 90%;
            object-fit: cover;
            border-radius: 50%;
        }
        
        .divider {
            width: 96px;
            height: 2px;
            background: linear-gradient(to right, transparent, #D4AF37, transparent);
            margin: 0 auto 24px;
        }
        
        .hashtag-text {
            font-size: 18px;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto 32px;
            color: #5C4B37;
        }
        
        .hashtag {
            font-weight: 600;
            color: #8B7355;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            padding: 16px 32px;
            margin-bottom: 32px;
            display: inline-block;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        .event-details {
            font-size: 18px;
            color: #8B7355;
            font-weight: 500;
        }
        
        .button-container {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
            margin-bottom: 40px;
        }
        
        .button-primary, .button-secondary {
            padding: 12px 32px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .button-primary {
            background: #D4AF37;
            color: white;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        
        .button-primary:hover {
            background: #C19D2A;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }
        
        .button-secondary {
            background: transparent;
            color: #8B7355;
            border: 2px solid #8B7355;
        }
        
        .button-secondary:hover {
            background: #8B7355;
            color: white;
        }
        
        .scroll-indicator {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
            40% {transform: translateY(-20px) translateX(-50%);}
            60% {transform: translateY(-10px) translateX(-50%);}
        }
        
        .scroll-line {
            width: 2px;
            height: 32px;
            background: linear-gradient(to bottom, #D4AF37, transparent);
            border-radius: 1px;
            margin: 0 auto;
        }
        
        /* Responsive adjustments */
        @media (min-width: 768px) {
            .image-container {
                width: 360px;
                height: 360px;
            }
            
            .hashtag-text {
                font-size: 20px;
            }
        }
        
        @media (min-width: 1024px) {
            .image-container {
                width: 420px;
                height: 420px;
            }
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { Heart } = lucideReact;

        const Hero = () => {
            // Using a placeholder image since the original path isn't working
            const imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80";
            
            return (
                <section className="hero-section">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-20 left-10 w-32 h-32 golden-swirl"></div>
                    <div className="absolute bottom-40 right-20 w-40 h-40 golden-swirl-2"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold organic-shape" style={{backgroundColor: '#D4AF37', opacity: '0.05'}}></div>
                    <div className="absolute bottom-1/4 left-10 w-20 h-20 organic-shape-2" style={{backgroundColor: '#8B7355', opacity: '0.1'}}></div>
                    
                    {/* Main Content */}
                    <div className="hero-content">
                        <div className="mb-8">
                            <Heart className="heart-icon" />
                        </div>
                        
                        {/* Couples Logo/Image */}
                        <div className="mb-8">
                            <div className="image-container">
                                <img 
                                    src={imageUrl}
                                    alt="Happy Couple"
                                    className="couple-image"
                                />
                            </div>
                        </div>
                    
                        <div className="divider"></div>
                        
                        {/* Hashtag Meaning */}
                        <p className="hashtag-text">
                            Our Hashtag <span className="hashtag">"#TheHesed"</span> comes from the Hebrew word hesed, a powerful term from the Bible that describes God's faithful, covenantal love—a love that is steadfast, merciful, and enduring. It represents the kind of love we strive to embody in our marriage.
                        </p>
                        
                        {/* Event Date & Venue */}
                        <div className="glass-effect">
                            <p className="event-details">
                                December 10th, 2025 • 9:00 AM - 11:00 AM WAT.
                            </p>
                        </div>
                        
                        {/* Buttons */}
                        <div className="button-container">
                            <a 
                                href="#rsvp" 
                                className="button-primary"
                            >
                                RSVP Now
                            </a>
                            <a 
                                href="#details" 
                                className="button-secondary"
                            >
                                Event Details
                            </a>
                        </div>
                    </div>
                    
                    {/* Scroll Indicator */}
                    <div className="scroll-indicator">
                        <div className="scroll-line"></div>
                    </div>
                </section>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Hero />);
    </script>
</body>
</html>
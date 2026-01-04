-- Create faculty_coordinators table for storing single faculty coordinator information
CREATE TABLE IF NOT EXISTS faculty_coordinators (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  bio TEXT,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  twitter_url VARCHAR(500),
  website_url VARCHAR(500),
  department VARCHAR(100),
  office_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default faculty coordinator data
INSERT INTO faculty_coordinators (name, title, image, bio, email, linkedin_url) 
VALUES (
  'Dr. Rajesh Kumar',
  'Faculty Coordinator',
  '/professor-faculty-member-portrait.jpg',
  'With over 15 years of experience in computer science education, Dr. Kumar leads our chapter\'s vision for innovation and student development.',
  'r.kumar@srhu.edu.in',
  'https://linkedin.com/in/rajeshkumar'
)
ON DUPLICATE KEY UPDATE id=id;

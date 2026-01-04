# ACM SRHU Website

A modern, responsive, and feature-rich website for ACM Student Chapter at Swami Rama Himalayan University.

## Features

- ✨ **Typing Animation** - Dynamic hero text with character-by-character animation
- 🎨 Modern hero section with smooth animations
- 📄 Comprehensive pages (Home, About, Team, Events, Gallery, Membership, Resources, Contact)
- 🔐 Admin panel with full CRUD operations
- ⚙️ **Settings Manager** - Edit all static website content from admin panel
- 📊 **Real-time Dashboard** - Live statistics from database
- 💾 MySQL database integration
- 📱 Responsive design (mobile-first)
- 🎭 Glassmorphism & neumorphism UI
- ✨ Smooth page transitions and animations
- 🔍 SEO optimized
- 🌙 Dark mode ready
- ✅ **Working Member Registration** - Saves to database with validation

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom animations
- **Database**: MySQL
- **Backend**: Next.js API Routes
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MySQL Server (local or cloud)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/acm-srhu-website.git
   cd acm-srhu-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

4. Update `.env.local` with your values:
   \`\`\`
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_DATABASE=acm_srhu
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   ADMIN_PASSWORD=your_secure_password
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   \`\`\`

5. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
acm-srhu-website/
├── app/
│   ├── api/           # API routes
│   ├── admin/         # Admin panel
│   ├── about/         # About page
│   ├── events/        # Events page
│   ├── gallery/       # Gallery page
│   ├── team/          # Team page
│   ├── membership/    # Membership page
│   ├── resources/     # Resources page
│   ├── contact/       # Contact page
│   └── layout.tsx     # Root layout
├── components/
│   ├── admin/         # Admin components
│   ├── home/          # Home page components
│   ├── team/          # Team components
│   ├── events/        # Events components
│   ├── gallery/       # Gallery components
│   ├── common/        # Shared components
│   └── ...
├── lib/
│   ├── db.ts          # Database connection
│   └── auth.ts        # Authentication utilities
├── public/            # Static assets
└── middleware.ts      # Route protection
\`\`\`

## Pages

- **Home** (`/`): Hero section, mission, stats, upcoming events
- **About** (`/about`): Chapter information, faculty coordinator, goals
- **Team** (`/team`): Team member cards with social links
- **Events** (`/events`): Upcoming and past events with filtering
- **Gallery** (`/gallery`): Event photos with lightbox viewer
- **Membership** (`/membership`): Benefits and membership form
- **Resources** (`/resources`): Curated learning resources
- **Contact** (`/contact`): Contact form and information
- **Admin** (`/admin`): Manage events, team, gallery, members, resources

## Admin Panel

Access the admin panel at `/admin-login` with the password set in `.env.local`.

### Features

- Dashboard overview with real-time statistics
- Event management (CRUD)
- Team member management
- Gallery image management
- Member registration tracking
- Resource management
- **Settings Manager** ⭐ NEW - Edit all static website content
  - Hero section text
  - Statistics numbers
  - Mission statement
  - Contact information

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

## Performance

- Optimized Core Web Vitals
- Automatic image optimization
- Code splitting
- CSS purging
- Lazy loading

See [OPTIMIZATION.md](OPTIMIZATION.md) for details.

## Database Schema

### Collections

- **events**: Event information with date, location, category
- **team_members**: Team member profiles with social links
- **gallery**: Event gallery images with categorization
- **members**: ACM member registrations
- **resources**: Learning resource links and information

## Security

- Admin panel password protected
- Environment variables for sensitive data
- CORS configuration
- Security headers enabled
- MySQL connection pooling

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## Documentation

Comprehensive guides are available:

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview and features
- **[ADMIN_LOGIN_SETUP.md](ADMIN_LOGIN_SETUP.md)** - Step-by-step MySQL and login setup
- **[ADMIN_PANEL_FIXES.md](ADMIN_PANEL_FIXES.md)** - Admin panel features and usage
- **[HYDRATION_FIX.md](HYDRATION_FIX.md)** - Technical details on typing animation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions
- **[OPTIMIZATION.md](OPTIMIZATION.md)** - Performance optimization guide
- **[SETUP_MYSQL.md](SETUP_MYSQL.md)** - MySQL setup and configuration

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please create an issue in the repository.

## Acknowledgments

- ACM International
- Swami Rama Himalayan University
- The open-source community

---

**Built with Next.js and Tailwind CSS** | **Deployed on Vercel**

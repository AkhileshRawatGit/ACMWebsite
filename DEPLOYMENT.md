# ACM SRHU Website - Deployment Guide

## Quick Start Deployment

### Prerequisites
- Vercel Account (free tier available)
- MongoDB Atlas Cluster (free tier available)
- GitHub Account

### Step 1: Prepare Your Code

1. Initialize a Git repository if you haven't already:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit: ACM SRHU website"
   \`\`\`

2. Push to GitHub:
   \`\`\`bash
   git remote add origin https://github.com/yourusername/acm-srhu-website.git
   git push -u origin main
   \`\`\`

### Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. In the cluster, go to "Connect" and copy your connection string
4. Replace `<password>` with your database password
5. Update the connection string to include database name: `mongodb+srv://username:password@cluster.mongodb.net/acm_srhu?retryWrites=true&w=majority`

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" and import your GitHub repository
3. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_PASSWORD`: Your secure admin password (e.g., use a strong password instead of default)
   - `NEXT_PUBLIC_SITE_URL`: Your Vercel deployment URL

4. Click "Deploy"

### Step 4: Configure Custom Domain (Optional)

1. In Vercel Project Settings, go to "Domains"
2. Add your custom domain (e.g., acm-srhu.edu.in)
3. Update your domain's DNS records according to Vercel's instructions

### Step 5: Database Initialization

After deployment, your MongoDB collections will be created automatically when you first access them. To pre-populate with sample data:

1. Use MongoDB Atlas UI to create collections:
   - `events`
   - `team_members`
   - `gallery`
   - `members`
   - `resources`

Or use a script to initialize them programmatically.

## Optimization Tips

### Performance Optimization

1. **Image Optimization**
   - All images are automatically optimized by Next.js
   - Use WebP format for better compression
   - Implement lazy loading with the Image component

2. **Code Splitting**
   - The app automatically code-splits at route boundaries
   - Dynamic imports are used for heavy components

3. **Caching Strategy**
   - Set appropriate cache headers in `next.config.mjs`
   - Use ISR (Incremental Static Regeneration) for pages that update frequently

4. **Bundle Size**
   - Lucide icons are optimized with `optimizePackageImports`
   - Unused CSS is automatically purged by Tailwind

### SEO Optimization

1. **Meta Tags**
   - Already configured in `app/layout.tsx`
   - Update metadata for each page

2. **Sitemap** (Add to `public/sitemap.xml`):
   \`\`\`xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://acm-srhu.com/</loc>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://acm-srhu.com/about</loc>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://acm-srhu.com/events</loc>
       <priority>0.8</priority>
     </url>
     <!-- Add other pages -->
   </urlset>
   \`\`\`

3. **robots.txt** (Add to `public/robots.txt`):
   \`\`\`
   User-agent: *
   Allow: /
   Disallow: /admin-login
   Disallow: /api/
   Sitemap: https://acm-srhu.com/sitemap.xml
   \`\`\`

### Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Always use strong, unique passwords
   - Rotate admin password regularly

2. **CORS Configuration**
   - API routes are protected and only accept requests from your domain
   - Implement rate limiting for production

3. **Database Security**
   - Enable IP whitelist in MongoDB Atlas
   - Use strong database passwords
   - Regularly backup your database

4. **SSL/TLS**
   - Vercel automatically provides SSL certificates
   - HTTPS is enabled by default

### Monitoring & Analytics

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor Core Web Vitals

2. **Error Tracking**
   - Set up error logging with Sentry or similar service
   - Monitor API errors

3. **Database Monitoring**
   - Use MongoDB Atlas monitoring dashboard
   - Set up alerts for unusual activity

## Environment Variables Checklist

- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `ADMIN_PASSWORD` - Strong admin panel password
- [ ] `NEXT_PUBLIC_SITE_URL` - Your site's URL

## Verification Checklist

Before going live:

- [ ] Admin panel is password protected
- [ ] All pages load without errors
- [ ] Mobile responsive design works
- [ ] Images load correctly
- [ ] API routes return correct data
- [ ] Database connections are working
- [ ] Meta tags are correct
- [ ] sitemap.xml and robots.txt are accessible
- [ ] SSL certificate is active
- [ ] Custom domain is configured (if applicable)

## Maintenance

### Regular Tasks

1. **Monthly**
   - Review analytics and user feedback
   - Update team member information
   - Add new events as they're scheduled

2. **Quarterly**
   - Review security logs
   - Update dependencies
   - Optimize performance metrics

3. **Annually**
   - Full security audit
   - Database backup verification
   - Renewal of SSL certificates

### Backup Strategy

1. Enable automated backups in MongoDB Atlas
2. Export data monthly to secure storage
3. Test restore procedures quarterly

## Troubleshooting

### MongoDB Connection Issues

If getting connection errors:
1. Verify connection string in environment variables
2. Check IP whitelist in MongoDB Atlas
3. Ensure database name is correct in connection string
4. Verify user permissions in MongoDB

### API Routes Not Working

1. Check function timeout settings in `vercel.json`
2. Verify environment variables are set
3. Check API logs in Vercel dashboard

### Performance Issues

1. Check image sizes in Network tab
2. Review bundle size with `npm run build`
3. Enable Vercel Analytics for Core Web Vitals

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Post-Deployment

After successful deployment:

1. Share the site URL with ACM SRHU leadership
2. Set up social media links in footer
3. Collect feedback from users
4. Plan feature updates based on usage analytics
5. Schedule regular content updates

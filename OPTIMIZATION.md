# Performance & Optimization Guide

## Web Vitals Optimization

### Core Web Vitals

1. **Largest Contentful Paint (LCP) - Target: < 2.5s**
   - Optimize images (WebP format)
   - Minimize CSS/JS
   - Preload critical resources

2. **First Input Delay (FID) - Target: < 100ms**
   - Reduce JavaScript execution time
   - Use code splitting
   - Avoid long tasks

3. **Cumulative Layout Shift (CLS) - Target: < 0.1**
   - Reserve space for dynamic content
   - Avoid inserting content above the fold
   - Use transform animations instead of layout changes

## Build Optimization

\`\`\`bash
# Analyze bundle size
npm run build

# Check for unused imports
npx depcheck

# Audit dependencies
npm audit
\`\`\`

## Database Optimization

### Indexing Strategy

Create indexes in MongoDB for frequently queried fields:

\`\`\`javascript
db.events.createIndex({ date: 1 })
db.events.createIndex({ category: 1 })
db.team_members.createIndex({ role: 1 })
db.members.createIndex({ email: 1, unique: true })
db.gallery.createIndex({ category: 1 })
\`\`\`

### Query Optimization

- Always use pagination for large datasets
- Filter before sorting
- Use projection to limit returned fields

## Frontend Performance

### CSS Optimization
- Tailwind CSS automatically purges unused styles
- Keep custom CSS minimal
- Use utility classes effectively

### JavaScript Optimization
- Code split at route boundaries (automatic with Next.js)
- Use dynamic imports for heavy components
- Remove console.log statements in production

### Image Optimization
- Use Next.js Image component for automatic optimization
- Provide multiple formats (AVIF, WebP, PNG)
- Lazy load images below the fold

## API Optimization

### Rate Limiting

Implement rate limiting for production:

\`\`\`typescript
// Example: Add to API routes
const rateLimit = new Map();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip) || [];
  
  // Remove old requests (older than 1 minute)
  const recent = limit.filter(time => now - time < 60000);
  
  if (recent.length >= 100) return true;
  recent.push(now);
  rateLimit.set(ip, recent);
  return false;
}
\`\`\`

### Caching

- Cache GET requests aggressively
- Use ETag headers for validation
- Implement stale-while-revalidate

## Monitoring

### Essential Metrics to Monitor

1. **Page Load Time**: Target < 3 seconds
2. **Time to First Byte (TTFB)**: Target < 600ms
3. **JavaScript Size**: Keep < 150KB (gzipped)
4. **CSS Size**: Keep < 50KB (gzipped)
5. **Image Size**: Optimize aggressively

### Tools

- [PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://webpagetest.org)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- Vercel Analytics (built-in)

## Maintenance Checklist

- [ ] Weekly: Monitor error rates
- [ ] Bi-weekly: Review performance metrics
- [ ] Monthly: Audit dependencies for updates
- [ ] Quarterly: Full performance audit
- [ ] Annually: Security and compliance review

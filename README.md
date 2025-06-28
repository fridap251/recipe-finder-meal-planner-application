# Finge - Recipe Finder & Meal Planner

Finge application is a web-based tool designed to help users discover and manage recipes. Deployed on Bolt.new with Netlify, it provides a scalable platform for accessing recipes anytime, anywhere.

## 🚀 Features

### 🔐 Authentication
- **Email & Password**: Secure account creation and login
- **GitHub OAuth**: One-click sign in with GitHub
- **Protected Routes**: Secure access to personal features
- **Session Management**: Persistent login across browser sessions

### 🍳 Recipe Discovery
- **Browse Recipes**: Extensive collection with advanced filtering
- **Swipe Mode**: Tinder-style recipe discovery (NEW!)
- **Image Recognition**: Upload food photos to find similar recipes
- **Smart Search**: Find recipes by ingredients, cuisine, or dietary needs

### 📅 Meal Planning
- **Weekly Planning**: Organize meals for the entire week
- **Drag & Drop**: Easy meal assignment to days and meal types
- **Multiple Plans**: Create and manage different meal plans
- **Shopping Lists**: Generate lists from your meal plans

### ❤️ Personal Collection
- **Favorites**: Save recipes you love
- **Personal Dashboard**: View your recipe collection
- **Sync Across Devices**: Access your data anywhere

## 🛠 How I Built It

Built with modern web technologies and deployed using Bolt.new:

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Authentication**: Supabase Auth with GitHub OAuth
- **Database**: Supabase PostgreSQL with Row Level Security
- **Deployment**: Netlify with automatic deployments
- **State Management**: React Context API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## 🔧 GitHub OAuth Setup

To enable GitHub authentication:

1. **Supabase Dashboard**:
   - Go to: https://supabase.com/dashboard/project/ertsozhibvhpzgcygnmz/auth/providers
   - Click on "GitHub" provider
   - Toggle "Enable sign in with GitHub"

2. **GitHub OAuth App** (Already Created):
   - Application name: `Finge`
   - Homepage URL: `https://stellar-puffpuff-768d8a.netlify.app`
   - Authorization callback URL: `https://ertsozhibvhpzgcygnmz.supabase.co/auth/v1/callback`

3. **Add Credentials to Supabase**:
   - Copy Client ID and Client Secret from your GitHub OAuth app
   - Paste them in the Supabase GitHub provider settings
   - Save the configuration

## 🌟 Challenges I Ran Into

- **Authentication Flow**: Implementing secure OAuth with proper redirect handling
- **Database Design**: Creating efficient schemas with proper relationships
- **Real-time Sync**: Ensuring data consistency across different devices
- **Image Processing**: Handling file uploads and image analysis
- **Responsive Design**: Creating a mobile-first experience that works everywhere

## 🎯 Accomplishments I'm Proud Of

- **Successful Deployment**: Fully functional app deployed to production
- **Modern Authentication**: Secure, user-friendly auth with multiple providers
- **Innovative UI**: Swipe-based recipe discovery inspired by dating apps
- **Database Integration**: Robust data layer with Supabase
- **Performance**: Fast, responsive experience with proper loading states
- **Error Handling**: Graceful fallbacks and error recovery

## 📚 What I Learned

- **Supabase Integration**: Deep dive into modern backend-as-a-service
- **OAuth Implementation**: Secure third-party authentication flows
- **React Patterns**: Advanced state management and component architecture
- **Database Design**: PostgreSQL with Row Level Security policies
- **Deployment Strategies**: CI/CD with Netlify and environment management
- **User Experience**: Creating intuitive, engaging interfaces

## 🚀 What's Next for Finge

### Short Term
- **Voice Input**: Hands-free ingredient entry
- **Grocery Integration**: Connect with delivery services
- **Recipe Sharing**: Social features for sharing favorite recipes
- **Nutrition Tracking**: Detailed macro and calorie tracking

### Long Term
- **AI Recipe Generation**: Create custom recipes based on preferences
- **Smart Shopping**: Automated grocery list optimization
- **Community Features**: Recipe reviews and ratings
- **Mobile App**: Native iOS and Android applications
- **Chef Partnerships**: Exclusive recipes from professional chefs

## 🔗 Live Demo

**Try Finge here**: https://stellar-puffpuff-768d8a.netlify.app

## 🛡️ Security Features

- **Row Level Security**: Database-level access control
- **Secure Authentication**: Industry-standard OAuth and JWT
- **Environment Variables**: Sensitive data properly protected
- **HTTPS Only**: All communications encrypted
- **Session Management**: Secure token handling

## 📱 Mobile Experience

- **Responsive Design**: Works perfectly on all screen sizes
- **Touch Gestures**: Swipe interactions for mobile users
- **Fast Loading**: Optimized for mobile networks
- **Offline Fallbacks**: Graceful degradation when offline

---

Built with ❤️ using Bolt.new and deployed on Netlify
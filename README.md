# Animated Leaderboard Component

A beautiful, animated leaderboard component built with Next.js, Firebase Firestore, and Framer Motion. Perfect for tracking referrals, scores, or any ranking system in your applications.

![Leaderboard Preview](https://via.placeholder.com/800x400/FF69B4/FFFFFF?text=Animated+Leaderboard)

## ✨ Features

- **Real-time Updates**: Powered by Firebase Firestore for instant data synchronization
- **Smooth Animations**: Beautiful transitions and micro-interactions using Framer Motion
- **Responsive Design**: Fully responsive with modern glassmorphism UI
- **Rank Calculation**: Automatic ranking with proper tie handling
- **User Management**: Add new users and increment referral counts
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Gradient Background**: Eye-catching animated gradient background

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Firebase project with Firestore enabled
- Next.js 13+ (App Router)

### Installation

1. **Install dependencies:**
```bash
npm install firebase framer-motion lucide-react
# or
yarn add firebase framer-motion lucide-react
```

2. **Install shadcn/ui components:**
```bash
npx shadcn-ui@latest add table button input
```

3. **Set up Firebase configuration:**

Create `src/firebaseConfig.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

4. **Add custom CSS for animations:**

Add to your `globals.css`:
```css
.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

## 📊 Firestore Data Structure

The component expects a `leaderboard` collection with documents containing:

```javascript
{
  userId: string,      // Unique identifier for the user
  referralCount: number // Number of referrals/points
}
```

## 🎯 Usage

### Basic Implementation

```tsx
import Leaderboard from './path/to/Leaderboard';

export default function App() {
  return (
    <div>
      <Leaderboard />
    </div>
  );
}
```

### As a Page Component

```tsx
// app/leaderboard/page.tsx
import Leaderboard from '@/components/Leaderboard';

export default function LeaderboardPage() {
  return <Leaderboard />;
}
```

### Integration in Existing Layout

```tsx
export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <h1>Dashboard</h1>
      <div className="mt-8">
        <Leaderboard />
      </div>
    </div>
  );
}
```

## 🎨 Customization

### Styling

The component uses Tailwind CSS classes and can be easily customized:

- **Colors**: Modify the gradient background in `animated-gradient` class
- **Animations**: Adjust Framer Motion parameters in the component
- **Spacing**: Update padding and margin classes
- **Typography**: Change font sizes and weights

### Configuration Options

You can extend the component with additional props:

```tsx
interface LeaderboardProps {
  title?: string;
  maxEntries?: number;
  showAddUser?: boolean;
  animationDuration?: number;
}
```

## 🔧 API Reference

### Component Methods

- `fetchLeaderboardData()`: Retrieves and ranks data from Firestore
- `incrementReferralCount(id: string)`: Increases a user's referral count
- `addNewUser(userId: string)`: Adds a new user to the leaderboard

### Firebase Operations

- **Read**: `getDocs()` with `orderBy('referralCount', 'desc')`
- **Update**: `updateDoc()` to increment counts
- **Create**: `addDoc()` to add new users

## 🚦 Performance Considerations

- Data is fetched on component mount and after mutations
- Animations are optimized with Framer Motion's layout animations
- Firestore queries are ordered server-side for better performance
- Consider implementing pagination for large datasets

## 🔒 Security

- Implement Firestore security rules to protect your data
- Consider authentication before allowing user additions
- Validate input data on both client and server side

Example Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🌟 Advanced Features

### Real-time Updates

For real-time functionality, replace `getDocs()` with `onSnapshot()`:

```tsx
import { onSnapshot } from 'firebase/firestore';

useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(db, 'leaderboard'), orderBy('referralCount', 'desc')),
    (snapshot) => {
      // Update leaderboard data
    }
  );
  
  return () => unsubscribe();
}, []);
```

### Data Validation

Add TypeScript interfaces for better type safety:

```tsx
interface User {
  id: string;
  userId: string;
  referralCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 📱 Responsive Design

The component is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use this component in your projects!

## 🛠️ Tech Stack

- **Next.js 13+** - React framework with App Router
- **Firebase Firestore** - Real-time database
- **Framer Motion** - Animation library
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **TypeScript** - Type safety

## 📞 Support

If you encounter any issues or have questions:
1. Check the Firebase console for connectivity issues
2. Ensure all dependencies are properly installed
3. Verify your Firebase configuration
4. Check browser console for error messages

---

Built with ❤️ using Next.js and Firebase

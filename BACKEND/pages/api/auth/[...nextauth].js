import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // Connect to the database
                const db = await connectToDatabase();
                const collection = db.collection('admin');

                // Check if the user exists
                const user = await collection.findOne({ email: credentials.email });

                // Validate user credentials
                if (user && user.password === credentials.password) {
                    return { id: user._id, email: user.email };
                }

                // Return null if authentication fails
                return null;
            },
        }),
    ],
    database: process.env.MONGODB_URI,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token._id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
});

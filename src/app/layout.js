import "@styles/globals.css";

export const metadata = {
    title: "Webever Edu",
    description: "Webever Edu - Learn to code with us!",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;

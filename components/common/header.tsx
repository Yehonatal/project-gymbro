import Link from "next/link";

export const Header = () => {
    return (
        <header className="site-header">
            <div className="flex items-center gap-3">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <h1 className="brand">GYMBRO</h1>
                </Link>
            </div>

            <div className="header-actions">
                <div className="subtle font-medium tracking-tight">
                    Weekly training tracker
                </div>
            </div>
        </header>
    );
};

function Container({ children }: { children: React.ReactNode }) {
    return <div className="max-w-360 mx-auto px-4 sm:px-10 md:px-20">{children}</div>;
}

export default Container;

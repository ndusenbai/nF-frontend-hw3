import React from 'react';
import Link from 'next/link';


const Home = async () => {
    return (
      <div>
        <main className="flex flex-row items-center justify-between p-24">
          <Link href="/posts">
            <button className="btn btn-primary">
                GO Posts
            </button>
          </Link>
          <Link href="/login">
            <button className="btn btn-primary">
                GO Login
            </button>
          </Link>
        </main>
      </div>
    );
};

export default Home;

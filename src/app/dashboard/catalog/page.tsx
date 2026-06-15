'use client';

import { useState, useEffect } from 'react';
import { Search, Music, MoreHorizontal, ArrowDownToLine } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  isrc: string;
  streams: number;
  revenue: number;
  split: number;
}

export default function CatalogPage() {
  const [catalog, setCatalog] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const randomArtistId = Math.floor(Math.random() * 5) + 1;
        const res = await fetch(`/api/catalog?artistId=${randomArtistId}`);
        const data = await res.json();
        setCatalog(data);
      } catch (error) {
        console.error('Failed to fetch catalog', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalog();
  }, []);

  const filteredCatalog = catalog.filter((song) => {
    const query = searchQuery.toLowerCase();
    return song.title.toLowerCase().includes(query) || song.isrc.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Song Catalog</h1>
          <p className="text-gray-400 text-lg">Manage and analyze published works for <span className="text-indigo-400 font-bold">{catalog[0]?.artist || 'Artist'}</span>.</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/20">
          <ArrowDownToLine className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-2xl p-4 shadow-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by song title or ISRC code..."
            className="w-full bg-[#374151]/20 border border-[#4b5563]/30 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-[#1f2937]/30 border border-[#374151]/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#374151]/20 text-gray-400 text-sm uppercase tracking-wider border-b border-[#374151]/30">
                <th className="px-6 py-4 font-semibold">Song Info</th>
                <th className="px-6 py-4 font-semibold">ISRC</th>
                <th className="px-6 py-4 font-semibold">Release Date</th>
                <th className="px-6 py-4 font-semibold text-right">Streams</th>
                <th className="px-6 py-4 font-semibold text-right">Revenue</th>
                <th className="px-6 py-4 font-semibold text-right">Rujo Split</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#374151]/30">
              {filteredCatalog.length > 0 ? (
                filteredCatalog.map((song) => (
                  <tr key={song.id} className="hover:bg-[#374151]/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                          <Music className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-base group-hover:text-indigo-300 transition-colors">{song.title}</p>
                          <p className="text-gray-400 text-sm mt-0.5">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 font-mono text-sm bg-gray-800/50 px-2.5 py-1 rounded-lg border border-gray-700/50">
                        {song.isrc}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(song.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-medium">
                        {song.streams.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-bold">
                        KSh {song.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                        {song.split}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No songs found matching "{searchQuery}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

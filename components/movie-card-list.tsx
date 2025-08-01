'use client';

import { useQuery } from '@tanstack/react-query';
import MovieCard from './movie-card';
import { getAllMovies, searchMovies } from '@/actions/movieActions';
import { Spinner } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/utils/recoil/atom';

export default function MovieCardList() {
  const search = useRecoilValue(searchState);

  const getAllMoviesQuery = useQuery({
    queryKey: ['movies', search], // search값이 변경될때마다 queryFn이 실행됨
    queryFn: () => searchMovies(search),
  });
  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {getAllMoviesQuery.isLoading && (
        <Spinner
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      )}
      {getAllMoviesQuery.data &&
        getAllMoviesQuery.data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}

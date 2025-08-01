import MovieCardList from '../components/movie-card-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { searchMovies } from '../actions/movieActions';

export default async function UI() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['movies', ''], // search
    queryFn: () => searchMovies(''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="mt-16">
        <MovieCardList />
      </main>
    </HydrationBoundary>
  );
}

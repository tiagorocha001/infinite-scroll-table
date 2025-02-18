import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { PostsTable } from './components/PostsTable';
import { usePostsQuery } from './hooks/usePostsQuery';

const queryClient = new QueryClient();

const PostsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  
  // Reset page when search term changes
  React.useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const { 
    data,
    isLoading,
    isError,
  } = usePostsQuery(searchTerm, page);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Posts Table
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <PostsTable
          data={data?.data ?? []}
          isLoading={isLoading}
          isError={isError}
          page={page}
          totalPages={data?.totalPages ?? 0}
          totalCount={data?.totalCount ?? 0}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsPage />
    </QueryClientProvider>
  );
};

export default App;
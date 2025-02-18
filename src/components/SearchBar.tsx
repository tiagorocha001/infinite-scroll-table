import React from 'react';
import { TextField, Box } from '@mui/material';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const debouncedSearch = React.useMemo(
    () => debounce((term: string) => onSearch(term), 300),
    [onSearch]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Search posts"
        variant="outlined"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </Box>
  );
};
import {
  Search,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';
import toast from 'react-hot-toast';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const inputValue = `${Date.now()}/${e.target.elements.query.value.trim()}`;
    const sliced = inputValue.split('/');
    const query = sliced[1];

    if (!query) {
      toast.error('You need input something');
      return;
    }

    onSubmit(query);

    e.target.reset();
  };

  return (
    <Search>
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchForm>
    </Search>
  );
};

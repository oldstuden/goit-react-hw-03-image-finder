import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from './Api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMsg } from './Loader/Loader.styled';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: false,
    loading: false,
    prevQuery: '',
    buttonLoadMore: true,
    searchFailed: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false });
        const { hits, totalHits } = await fetchImages(query, page);
        const selectedValues = () => {
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...hits.map(item => ({
                id: item.id,
                largeImageURL: item.largeImageURL,
                webformatURL: item.webformatURL,
                tags: item.tags,
              })),
            ],
            buttonLoadMore: false,
          }));
        };
        if (page === Math.ceil(totalHits / 15)) {
          toast.success('You have reached the end of the list of images found');
          selectedValues();
          return;
        }
        if (hits.length === 0) {
          this.setState({
            searchFailed: true,
          });
        }
        selectedValues();
        this.setState({
          buttonLoadMore: true,
        });
      } catch (error) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({
      prevQuery: this.state.query,
      query: query,
      images: [],
      page: 1,
      error: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, buttonLoadMore, searchFailed } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery hits={images} />}
        {searchFailed && images.length === 0 && !loading && (
          <ErrorMsg>
            Such images was not found, try find something else
          </ErrorMsg>
        )}
        {images.length > 0 && buttonLoadMore && !loading && (
          <Button loadMore={this.handleLoadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </div>
    );
  }
}

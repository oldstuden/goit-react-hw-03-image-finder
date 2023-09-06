import { LoaderWrapper } from './Loader.styled';
import { Circles } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <LoaderWrapper>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
};

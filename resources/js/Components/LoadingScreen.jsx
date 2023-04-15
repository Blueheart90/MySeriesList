import { TailSpin } from "react-loader-spinner";

const LoadingScreen = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
            <TailSpin
                height="80"
                width="80"
                color="#7ddb29"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="flex justify-center "
                visible={true}
            />
        </div>
    );
};

export default LoadingScreen;

import { useRef, useState } from "react";
import CameraIcon from "@/Components/svg/CameraIcon";
import CloseIcon from "@/Components/svg/CloseIcon";
import Avatar from "@/Components/Avatar";

const InputAvatar = ({
    setShowRemovePreview,
    showRemovePreview,
    currentAvatar,
    setData,
    reset,
}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const inputPhotoRef = useRef(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setData("profile_photo_path", event.target.files[0]);
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setShowRemovePreview(true);
        }
    };
    const handleImageRemove = (event) => {
        event.stopPropagation();
        inputPhotoRef.current.value = null;
        // setData("profile_photo_path", user.profile_photo_path);
        reset("profile_photo_path");
        setPreviewImage();
    };

    return (
        <div
            onClick={() => {
                inputPhotoRef.current.click();
            }}
            className="relative inline-flex cursor-pointer group"
        >
            {previewImage ? (
                <Avatar src={previewImage} alt="avatar" />
            ) : (
                <Avatar src={currentAvatar} alt="avatar" />
            )}
            <input
                id="profile_photo_path"
                ref={inputPhotoRef}
                className="hidden "
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <CameraIcon className="absolute w-10 p-1 -mt-5 -ml-5 transition-all duration-500 rounded-full opacity-0 stroke-primary left-1/2 top-1/2 group-hover:opacity-100" />
            {previewImage && showRemovePreview ? (
                <CloseIcon
                    onClick={handleImageRemove}
                    className="absolute top-0 right-0 text-xs bg-red-500 rounded-full w-7 text-light"
                />
            ) : null}
        </div>
    );
};

export default InputAvatar;

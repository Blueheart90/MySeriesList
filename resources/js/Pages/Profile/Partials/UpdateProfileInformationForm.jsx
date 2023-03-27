import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useRef, useState } from "react";
import CameraIcon from "@/Components/svg/CameraIcon";
import CloseIcon from "@/Components/svg/CloseIcon";
import Avatar from "@/Components/Avatar";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user;
    const [previewImage, setPreviewImage] = useState(null);
    const [showRemovePreview, setShowRemovePreview] = useState(false);
    const inputPhotoRef = useRef(null);

    const {
        data,
        setData,
        patch,
        post,
        errors,
        processing,
        recentlySuccessful,
        progress,
        reset,
    } = useForm({
        name: user.name,
        email: user.email,
        profile_photo_path: user.profile_photo_path,
    });

    console.log("ref", inputPhotoRef);
    console.log("data", data);

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

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            forceFormData: true,
            onSuccess: (page) => {
                setShowRemovePreview(false);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6 ">
                <div>
                    <InputLabel
                        for="profile_photo_path"
                        value="Profile Image"
                    />
                    <div
                        onClick={() => {
                            inputPhotoRef.current.click();
                        }}
                        className="relative inline-flex cursor-pointer group"
                    >
                        {previewImage ? (
                            <Avatar src={previewImage} alt="avatar" />
                        ) : (
                            <Avatar
                                src={`../storage/${data.profile_photo_path}`}
                                alt="avatar"
                            />
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

                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <InputError
                        className="mt-2"
                        message={errors.profile_photo_path}
                    />
                </div>
                <div>
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        className="block w-full mt-1"
                        value={data.name}
                        handleChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full mt-1"
                        value={data.email}
                        handleChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

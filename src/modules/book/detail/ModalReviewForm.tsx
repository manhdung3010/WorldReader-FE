import { Dialog, Transition } from "@/app/headlessui";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useState, useEffect } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewProduct } from "@/services/product.service";
import { uploadFiles } from "@/services/upload.service";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";

export interface ModalReviewFormProps {
  show: boolean;
  onCloseModalReviewForm: () => void;
  productId: number;
}

const ModalReviewForm: FC<ModalReviewFormProps> = ({
  show,
  onCloseModalReviewForm,
  productId,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"rating" | "details" | "photos">(
    "rating"
  );
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const fileUrl =
    process.env.NEXT_PUBLIC_FILE_URL || "http://localhost:5000/files/";

  // Auto-fill user information if available
  useEffect(() => {
    if (user) {
      // Use optional chaining and type assertion to safely access properties
      const userName = (user as any).name;
      const userPhone = (user as any).phone;

      if (userName) setName(userName);
      if (userPhone) setPhone(userPhone);
    }
  }, [user]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        await handleFileChange(acceptedFiles);
      }
    },
  });

  const handleFileChange = async (newFiles: File[]) => {
    try {
      toast.loading("Uploading files...", { id: "upload" });
      const response = await uploadFiles(newFiles);

      const uploadedFiles = response?.data?.uploadedFiles?.map(
        (file: any) => `${fileUrl}${encodeURIComponent(file?.file_name)}`
      );

      setImages((prev) => [...prev, ...uploadedFiles]);
      toast.success("Files uploaded successfully.", { id: "upload" });
    } catch (err) {
      toast.error("Error uploading files", { id: "upload" });
      console.error("Upload error:", err);
    }
  };

  const handleDeleteFile = (e: React.MouseEvent, fileUrl: string) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFiles = images.filter((file) => file !== fileUrl);
    setImages(updatedFiles);
  };

  const renderFiles = () => {
    return images.map((file: string, index) => (
      <div
        key={`${file}-${index}`}
        className="relative inline-flex m-1 hover:opacity-90"
      >
        <button
          className="absolute -top-2 -right-2 bg-white dark:bg-neutral-800 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 z-10 shadow-md"
          onClick={(e) => handleDeleteFile(e, file)}
        >
          <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="relative h-24 w-24 bg-gray-100 dark:bg-neutral-800 rounded-md overflow-hidden">
          <Image
            src={file}
            alt={`Uploaded image ${index + 1}`}
            fill
            className="object-cover"
            onError={(e) => {
              // Replace broken image with a placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className =
                  "flex items-center justify-center h-full w-full";
                placeholder.innerHTML =
                  '<svg class="w-8 h-8 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>
      </div>
    ));
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReviewProduct({
        productId,
        name: name,
        phone: phone,
        star: rating,
        content: comment,
        image: images,
      });

      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries(["REVIEW_PRODUCT"]);

      // Reset form data
      setRating(5);
      setComment("");
      setImages([]);

      // Only reset name and phone if they were manually entered (not auto-filled)
      if (!user) {
        setName("");
        setPhone("");
      }

      onCloseModalReviewForm();
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "rating":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                How would you rate this product?
              </h3>
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none mx-2 transform hover:scale-110 transition-transform"
                    >
                      <StarIcon
                        className={`w-10 h-10 ${
                          star <= rating
                            ? "text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {rating} {rating === 1 ? "Star" : "Stars"} -{" "}
                  {getRatingText(rating)}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="comment"
                rows={5}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
              />
            </div>
          </div>
        );

      case "details":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="space-y-6">
            <div
              {...getRootProps({ className: "dropzone" })}
              className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer flex flex-wrap justify-center items-center min-h-[300px] bg-gray-50 dark:bg-neutral-800 hover:border-primary-500 transition-colors duration-200"
            >
              <input {...getInputProps()} />
              {images.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {renderFiles()}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                    <PhotoIcon className="h-8 w-8 text-primary-500" />
                  </div>
                  <p className="text-base font-medium mb-2">
                    Drop photos here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    (Only *.png, *.jpg, *.jpeg, *.gif images accepted)
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModalReviewForm}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block lg:min-w-[800px] w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-neutral-900 shadow-xl rounded-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Write a Review
                </Dialog.Title>
                <ButtonClose onClick={onCloseModalReviewForm} />
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-4 text-center font-medium text-sm ${
                    activeTab === "rating"
                      ? "text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("rating")}
                >
                  Rating & Review
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium text-sm ${
                    activeTab === "details"
                      ? "text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Your Details
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium text-sm ${
                    activeTab === "photos"
                      ? "text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("photos")}
                >
                  Photos
                </button>
              </div>

              <div className="p-6">{renderTabContent()}</div>

              <div className="p-6 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex space-x-2">
                  {activeTab !== "rating" && (
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 dark:hover:bg-neutral-600"
                      onClick={() => setActiveTab("rating")}
                    >
                      Back
                    </button>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 dark:hover:bg-neutral-600"
                    onClick={onCloseModalReviewForm}
                  >
                    Cancel
                  </button>

                  {activeTab === "photos" ? (
                    <ButtonPrimary
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                      className="px-6 py-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </ButtonPrimary>
                  ) : (
                    <ButtonPrimary
                      onClick={() =>
                        setActiveTab(
                          activeTab === "rating" ? "details" : "photos"
                        )
                      }
                      className="px-6 py-2"
                    >
                      Next
                    </ButtonPrimary>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalReviewForm;

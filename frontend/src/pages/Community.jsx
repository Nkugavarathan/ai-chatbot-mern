import React, { useEffect, useState } from "react"
import { dummyPublishedImages } from "../assets/assets"
import Loading from "./Loading"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"
function Community() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true) // loading true until recieve images
  const { theme, axios, token } = useAppContext()
  const fetchImages = async () => {
    // setImages(dummyPublishedImages)
    // setLoading(false)

    try {
      const { data } = await axios.get("/api/user/published-images", {
        headers: {
          Authorization: token,
        },
      })
      if (data.success) {
        setImages(data.images)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchImages()
  }, [])
  //theme === "dark" ? "bg-blue-400" : "bg-amber-400"
  if (loading) return <Loading />
  return (
    <div
      className="p-6 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll 
bg-white dark:bg-[#0f0f17] transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-blue-700">
        {/* <h2
        className={`text-xl font-semibold mb-6 text-gray-700 ${
          theme === "dark" ? "text-blue-700" : "text-gray-700"
        }`}
      > */}
        Community Images
      </h2>
      {images.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-4">
          {images.map((item, index) => (
            <a
              href={item.imageUrl}
              key={index}
              target="_blank"
              className="relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <p className="absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300">
                Created by {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-blue-200 mt-10">
          No images Available
        </p>
      )}
    </div>
  )
}

export default Community

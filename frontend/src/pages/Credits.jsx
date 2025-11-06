import React, { useEffect, useState } from "react"
import { dummyPlans } from "../assets/assets"
import Loading from "./Loading"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

function Credits() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, axios } = useAppContext()
  const fetchPlans = async () => {
    // setPlans(dummyPlans)
    // setLoading(false)
    try {
      const { data } = await axios.get("/api/credit/plan", {
        headers: { Authorization: token },
      })
      console.log(data)

      if (data.success) {
        setPlans(data.plans)
      } else {
        toast.error(data.message || "Failed to fetch plans")
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchPlans()
  }, [])

  const purchasePlan = async (planId) => {
    try {
      const { data } = await axios.post(
        "/api/credit/purchase",
        { planId },
        { headers: { Authorization: token } }
      )
      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message || "Failed to payment")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <Loading />

  return (
    <div
      className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 
bg-white dark:bg-[#0f0f17] transition-colors duration-300"
    >
      <h2 className="text-3xl font-semibold text-center mb-4 xl:mt-30 text-gray-800 dark:text-white ">
        Credit Plans
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`border border-gray-200 dark:border-blue-500 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
              plan._id === "pro"
                ? "bg-blue-50 dark:bg-blue-900"
                : "bg-white dark:bg-transparent"
            }
             `}
          >
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-4">
                $ {plan.price}
                <span className="text-base font-normal text-gray-600 dark:text-blue-200">
                  / {plan.credits} credits
                </span>
              </p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="list-disc list-inside text-sm text-gray-700
space-y-1
                    dark:text-white"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() =>
                toast.promise(purchasePlan(plan._id), {
                  loading: "processing ...",
                })
              }
              className="mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 rounded transition-colors cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits

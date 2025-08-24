"use client";

import Link from "next/link";

const WhatsappFloating = () => {
  return (
    <div
      id="whatsapp-icon-container"
      className="fixed bottom-[70px] md:bottom-[85px] group right-6 z-50 "
    >
      <div
        id="whatsapp-icon"
        className="relative  cursor-pointer rounded-full flex items-center justify-center  hover:scale-110"
      >
        <div className="relative w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 ping-custom"></span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175.216 175.552"
            className="relative w-16 h-16"
          >
            <defs>
              <linearGradient
                id="b"
                x1="85.915"
                x2="86.535"
                y1="32.567"
                y2="137.092"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#57d163" />
                <stop offset="1" stop-color="#23b33a" />
              </linearGradient>
              <filter
                id="a"
                width="1.115"
                height="1.114"
                x="-.057"
                y="-.057"
                color-interpolation-filters="sRGB"
              >
                <feGaussianBlur stdDeviation="3.531" />
              </filter>
            </defs>
            <path
              fill="#b3b3b3"
              d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
              filter="url(#a)"
            />
            <path
              fill="#fff"
              d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
            />
            <path
              fill="url(#linearGradient1780)"
              d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
            />
            <path
              fill="url(#b)"
              d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
            />
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
            />
          </svg>
        </div>
      </div>
      <div className="fixed hidden  group-hover:block right-6 bottom-[150px] rounded-xl border border-green-200 shadow-xl bg-white p-4 max-w-xs transition-all duration-300">
        <div className="flex items-center mb-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-green-100 border-2 border-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="512"
              height="512"
              x="0"
              y="0"
              viewBox="0 0 60 60"
              className="w-5 h-5 fill-green-500"
            >
              <g>
                <path
                  d="M10 25.465h13a1 1 0 1 0 0-2H10a1 1 0 1 0 0 2zM36 29.465H10a1 1 0 1 0 0 2h26a1 1 0 1 0 0-2zM36 35.465H10a1 1 0 1 0 0 2h26a1 1 0 1 0 0-2z"
                  fill="#000000"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="m54.072 2.535-34.142-.07c-3.27 0-5.93 2.66-5.93 5.93v5.124l-8.07.017c-3.27 0-5.93 2.66-5.93 5.93v21.141c0 3.27 2.66 5.929 5.93 5.929H12v10a1 1 0 0 0 1.74.673l9.704-10.675 16.626-.068c3.27 0 5.93-2.66 5.93-5.929v-.113l5.26 5.786a1.002 1.002 0 0 0 1.74-.673v-10h1.07c3.27 0 5.93-2.66 5.93-5.929V8.465a5.937 5.937 0 0 0-5.928-5.93zM44 40.536a3.934 3.934 0 0 1-3.934 3.929l-17.07.07a1 1 0 0 0-.736.327L14 53.949v-8.414a1 1 0 0 0-1-1H5.93A3.934 3.934 0 0 1 2 40.606V19.465a3.935 3.935 0 0 1 3.932-3.93L15 15.516h.002l25.068-.052a3.934 3.934 0 0 1 3.93 3.93v21.142zm14-10.93a3.934 3.934 0 0 1-3.93 3.929H52a1 1 0 0 0-1 1v8.414l-5-5.5V19.395c0-3.27-2.66-5.93-5.932-5.93L16 13.514v-5.12a3.934 3.934 0 0 1 3.928-3.93l34.141.07h.002a3.934 3.934 0 0 1 3.93 3.93v21.142z"
                  fill="#000000"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>
        </div>

        <p className="text-gray-800 text-sm mb-4">
          I checked the website, and I have a few questions to ask
        </p>

        <Link
          href={`https://wa.me/+8801966688866?text=I checked the website, and I have a few questions to ask`}
          target="_blank"
        >
          <button className="flex items-center justify-between w-full bg-[#FFDD00]  px-4 py-3 rounded-lg shadow-md hover:bg-gray-900">
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 1000 1000"
                className="w-6 h-6"
              >
                <g>
                  <path
                    fill="#25d366"
                    d="M500 1000C223.9 1000 0 776.1 0 500S223.9 0 500 0s500 223.9 500 500-223.9 500-500 500z"
                    opacity="1"
                    data-original="#25d366"
                  ></path>
                  <path
                    fill="#ffffff"
                    fill-rule="evenodd"
                    d="M733.9 267.2c-62-62.1-144.6-96.3-232.5-96.4-181.1 0-328.6 147.4-328.6 328.6 0 57.9 15.1 114.5 43.9 164.3L170.1 834l174.2-45.7c48 26.2 102 40 157 40h.1c181.1 0 328.5-147.4 328.6-328.6.1-87.8-34-170.4-96.1-232.5zM501.5 772.8h-.1c-49 0-97.1-13.2-139-38.1l-10-5.9L249 755.9l27.6-100.8-6.5-10.3c-27.3-43.5-41.8-93.7-41.8-145.4.1-150.6 122.6-273.1 273.3-273.1 73 0 141.5 28.5 193.1 80.1s80 120.3 79.9 193.2c0 150.7-122.6 273.2-273.1 273.2zm149.8-204.6c-8.2-4.1-48.6-24-56.1-26.7s-13-4.1-18.5 4.1-21.2 26.7-26 32.2-9.6 6.2-17.8 2.1-34.7-12.8-66-40.8c-24.4-21.8-40.9-48.7-45.7-56.9s-.5-12.7 3.6-16.8c3.7-3.7 8.2-9.6 12.3-14.4s5.5-8.2 8.2-13.7 1.4-10.3-.7-14.4-18.5-44.5-25.3-61c-6.7-16-13.4-13.8-18.5-14.1-4.8-.2-10.3-.3-15.7-.3-5.5 0-14.4 2.1-21.9 10.3s-28.7 28.1-28.7 68.5 29.4 79.5 33.5 84.9c4.1 5.5 57.9 88.4 140.3 124 19.6 8.5 34.9 13.5 46.8 17.3 19.7 6.3 37.6 5.4 51.7 3.3 15.8-2.4 48.6-19.9 55.4-39 6.8-19.2 6.8-35.6 4.8-39s-7.5-5.4-15.7-9.6z"
                    clip-rule="evenodd"
                    opacity="1"
                    data-original="#ffffff"
                  ></path>
                </g>
              </svg>
              Chat With Us
            </span>
            <span className="text-lg">›</span>
          </button>
        </Link>

        <div className="absolute -bottom-[5px] right-4 w-6 h-6  bg-white border-b border-r rounded-br-sm border-green-200 rotate-45 translate-y-2"></div>
      </div>
      {/* <div
        id="whatsapp-popup-container"
        className="fixed bottom-36 right-6 w-80 z-40 hiddn group-hover:block transition-all duration-300 transform translate-y-0"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 60 60"
                className="w-6 h-6 fill-white"
              >
                <g>
                  <path
                    d="M10 25.465h13a1 1 0 1 0 0-2H10a1 1 0 1 0 0 2zM36 29.465H10a1 1 0 1 0 0 2h26a1 1 0 1 0 0-2zM36 35.465H10a1 1 0 1 0 0 2h26a1 1 0 1 0 0-2z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="m54.072 2.535-34.142-.07c-3.27 0-5.93 2.66-5.93 5.93v5.124l-8.07.017c-3.27 0-5.93 2.66-5.93 5.93v21.141c0 3.27 2.66 5.929 5.93 5.929H12v10a1 1 0 0 0 1.74.673l9.704-10.675 16.626-.068c3.27 0 5.93-2.66 5.93-5.929v-.113l5.26 5.786a1.002 1.002 0 0 0 1.74-.673v-10h1.07c3.27 0 5.93-2.66 5.93-5.929V8.465a5.937 5.937 0 0 0-5.928-5.93zM44 40.536a3.934 3.934 0 0 1-3.934 3.929l-17.07.07a1 1 0 0 0-.736.327L14 53.949v-8.414a1 1 0 0 0-1-1H5.93A3.934 3.934 0 0 1 2 40.606V19.465a3.935 3.935 0 0 1 3.932-3.93L15 15.516h.002l25.068-.052a3.934 3.934 0 0 1 3.93 3.93v21.142zm14-10.93a3.934 3.934 0 0 1-3.93 3.929H52a1 1 0 0 0-1 1v8.414l-5-5.5V19.395c0-3.27-2.66-5.93-5.932-5.93L16 13.514v-5.12a3.934 3.934 0 0 1 3.928-3.93l34.141.07h.002a3.934 3.934 0 0 1 3.93 3.93v21.142z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Chat with us!</h3>
          </div>

          <p className="text-gray-600 mb-6">
            I checked the website, and I have a few questions to ask
          </p>

          <a
            href="https://wa.me/YOUR_PHONE_NUMBER"
            target="_blank"
            className="w-full flex bg-slate-500 items-center justify-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg transition-colors duration-300 hover:bg-gray-700"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2.164c-5.46 0-9.88 4.42-9.88 9.88 0 1.58.376 3.084 1.05 4.444l-.99 3.61c-.13.473.08.97.476 1.155.395.184.887 0 1.096-.34l1.35-2.2c1.29.355 2.66.543 4.07.543h.004c5.46 0 9.88-4.42 9.88-9.88s-4.42-9.88-9.88-9.88zm3.93 14.164c-.184.288-.36.216-.48.168-.12-.05-.72-.252-.838-.28-1.5-.66-2.58-1.74-3.12-2.3-1.68-1.728-1.848-2.6-1.584-2.88.264-.288.66-.456.912-.72.24-.264.444-.312.6-.312.168 0 .288.024.432.336.144.312.492 1.176.54 1.284.048.118.084.252.012.408-.07.155-.42.443-.588.647-.216.276-.408.384-.36.432.048.048.42.66.906 1.166.726.756 1.344 1.092 1.548 1.2.144.096.348.084.48.036.132-.048.372-.144.528-.18.156-.036.9-.432 1.056-.48.168-.06.324-.096.6-.048.276.048.72.336.852.408.132.072.288.132.42.216.132.084.288.168.396.264.12.108.18.252.18.42s-.084.252-.168.324c-.084.072-.456.12-.66.24z" />
            </svg>
            <span className="font-bold">Chat With Us</span>
          </a>
        </div>

        <div
          id="close-popup-icon"
          className="w-12 h-12 bg-green-500 rounded-[0px_0px_0px_1200px] flex items-center justify-center shadow-lg cursor-pointer transform right-0 absolute transition-transform duration-300 hover:scale-110"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div> */}
    </div>
  );
};

export default WhatsappFloating;

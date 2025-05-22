const SocialMedia = () => {
  const instagramImages = [
    {
      id: 1,
      image: "social media/image (18).png",
      alt: "Person in beige coat",
      isSmall: true,
    },
    {
      id: 2,
      image: "social media/image (19).png",
      alt: "Blue t-shirt",
      isSmall: false,
    },
    {
      id: 3,
      image: "social media/image (20).png",
      alt: "Black t-shirt with text",
      isSmall: true,
    },
    {
      id: 4,
      image: "social media/image.png",
      alt: "Person in black clothing",
      isSmall: false,
    },
    {
      id: 5,
      image: "social media/image (22).png",
      alt: "White hoodie",
      isSmall: true,
    },
    {
      id: 6,
      image: "social media/image (23).png",
      alt: "Person in light colored clothing",
      isSmall: false,
    },
    {
      id: 7,
      image: "social media/image (24).png",
      alt: "Person in light colored clothing",
      isSmall: true,
    },
  ];

  return (
    <div className="w-full bg-white  py-12">
      <div className="text-center mb-20">
        <h2 className="md:text-3xl text-2xl font-medium mb-2 poppins-medium text-[#484848]">
          Follow Us On Instagram
        </h2>
        <div className="flex w-full justify-center items-center">
          <p className="md:text-sm text-xs text-gray-400 mb-6 md:px-0 px-2 md:w-1/3 ">
            Connect with us on Instagram to stay updated on the latest trends
            and exclusive offers from our store.
          </p>
        </div>
      </div>
      <div className="w-full overflow-hidden mb-16">
        <div className="flex w-full justify-center items-center">
          {instagramImages.map((img) => (
            <div
              key={img.id}
              className={`flex  w-[17.2%]  } ${
                img.isSmall ? "h-[120px] md:h-[200px]" : "h-[150px] md:h-[250px] "
              } overflow-hidden`}
            >
              <img
                src={img.image}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-8 mt-16">
        <div className="hidden md:block">
          <img
            src="social media/image 2.png"
            alt="Model in yellow coat"
            className="object-cover h-[500px]"
          />
        </div>

        <div className="text-center max-w-md">
          <h2 className="md:text-3xl text-2xl font-medium mb-2 poppins-medium text-[#484848]">
            Subscribe To Our Newsletter
          </h2>
          <div className="flex w-full justify-center items-center">
            <p className="text-xs text-gray-400 mb-6 md:px-0 px-2 ">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
              duis ultrices sollicitudin
            </p>
          </div>
          <div className="flex flex-col items-center mt-5 md:px-0 px-4">
            <input
              type="email"
              placeholder="rizo@gmail.com"
              className="w-full px-4 py-3 mb-4 bg-white shadow-lg border-none rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button className="bg-black text-white shadow-lg hover:bg-black/90 rounded px-7 py-2.5 text-xs font-medium w-full md:w-auto">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src="social media/image 3.png"
            alt="Model in gray coat"
            className="object-cover h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

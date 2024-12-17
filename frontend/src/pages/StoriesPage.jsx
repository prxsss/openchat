const StoriesPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {[...Array(10)].map((_, index) => (
        <div
          className="skeleton flex h-56 flex-col justify-between rounded-2xl px-4 pb-2 pt-4 hover:cursor-pointer"
          key={index}
        >
          <div className="avatar">
            <div className="skeleton w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img src="https://avatar.iran.liara.run/public" />
            </div>
          </div>
          <div>Dummy</div>
        </div>
      ))}
    </div>
  );
};
export default StoriesPage;

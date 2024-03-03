
function Newsletter() {
  return (
    <div className="bg-white dark:bg-whiteDark flex items-center justify-start gap-[15px] sm:flex-col sm:text-center py-[40px] pb-[35px] px-[25px] rounded-[10px] shadow-[0)5px_20px_rgba(173,181,255,0.05)]">
      <img src='/hexadash-nextjs/img/icon/message.svg' alt="" />
      <figcaption>
        <h2 className="mb-2.5 text-dark dark:text-white/[.87] text-[24px] leading-none font-semibold">
          Subscribe To Our Newsletter
        </h2>
        <p className="mb-0 text-body dark:text-white/60 text-[15px] not-italic">Sed ut perspiciatis unde omnis iste natussit</p>
      </figcaption>
    </div>
  );
}

export default Newsletter;

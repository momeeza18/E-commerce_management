import React from "react";

const Error = () => {
  return (
    <div>
      <section className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-2">
              <div className="lc-block">
                <lottie-player
                  src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="col-md-6 text-center text-md-start ">
              <div className="lc-block mb-3">
                <div editable="rich"></div>
              </div>
              <div className="lc-block mb-3">
                <div editable="rich">
                  <h1 className="display-1 fw-bold text-muted">Error 404</h1>
                </div>
              </div>
              <div className="lc-block mb-5">
                <div editable="rich">
                  <p className="rfs-11 fw-light">
                    The page you are looking for was moved, removed or might
                    never existed.
                  </p>
                </div>
              </div>
              <div className="lc-block">
                <a
                  className="btn btn-lg btn-secondary"
                  href="/dashboard"
                  role="button"
                >
                  Back to homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;

function ToastMessage() {
  let allElements = {
    top: [],
    bottom: [],
  };

  let toastMessage = {};

  toastMessage.create = (preferences = {}) => {
    const options = {
      classList: preferences.classList ? preferences.classList : null,
      title: preferences.title ? preferences.title : null,
      message: preferences.message || "This is Toast message!",
      icon: preferences.icon ? preferences.icon : null,
      duration: preferences.duration && preferences.duration > 0 ? preferences.duration * 1000 : preferences.duration <= 0 ? -1 : 5000,
      closeButton: ["false", "0"].includes(String(preferences.closeButton).toLowerCase()) ? false : true,
      position: {
        x: preferences.position && ["left", "center", "right"].includes(preferences.position.x) ? preferences.position.x : "right",
        y: preferences.position && ["bottom", "top"].includes(preferences.position.y) ? preferences.position.y : "bottom",
        z: preferences.position && preferences.position.z ? preferences.position.z : 50,
      },
      redirect:
        typeof preferences.redirect == "string"
          ? preferences.redirect
          : {
              url: preferences.redirect && preferences.redirect.url ? preferences.redirect.url : null,
              newWindow:
                preferences.redirect && ["false", "0"].includes(String(preferences.redirect.newWindow).toLowerCase()) ? false : true,
            },
      progressBar: ["false", "0"].includes(String(preferences.progressBar).toLowerCase())
        ? false
        : {
            show: preferences.progressBar && ["false", "0"].includes(String(preferences.progressBar.show).toLowerCase()) ? false : true,
            classList: preferences.progressBar && preferences.progressBar.classList ? preferences.progressBar.classList : null,
          },
    };

    const offset = 10;
    const transitionDuration = 300;

    var icon = null;
    var title = null;
    const message = document.createElement(typeof options.redirect == "string" || options.redirect.url ? "a" : "div");
    const content = document.createElement("div");
    var closeButton = null;
    var progressBar = null;
    const toastBody = document.createElement("div");
    const toastWrapper = document.createElement("div");

    // toast
    toastBody.className += "toast ";
    if (options.classList) {
      toastBody.className += options.classList;
    } else {
      toastBody.style.backgroundColor = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#f43f5e" : "#e11d48";
      toastBody.style.color = "#ffffff";
    }
    // icon
    if (options.icon) {
      icon = document.createElement("div");
      var iconContent = document.createElement("div");
      iconContent.classList.add("toast-icon");
      iconContent.innerHTML = options.icon;
      icon.append(iconContent);
      toastBody.append(icon);
    }

    // main content
    // toast title
    if (options.title) {
      title = document.createElement("div");
      title.classList.add("toast-title");
      title.append(options.title);
      content.append(title);
    }

    // toast message
    if (typeof options.redirect == "string") {
      message.href = options.redirect;
      message.style.textDecorationLine = "underline";
      message.style.textUnderlineOffset = "2px";
      message.target = "_blank";
      message.rel = "noopener noreferrer";
    } else if (options.redirect.url) {
      message.href = options.redirect.url;
      message.style.textDecorationLine = "underline";
      message.style.textUnderlineOffset = "2px";
      if (options.redirect.newWindow) {
        message.target = "_blank";
        message.rel = "noopener noreferrer";
      }
    }
    message.classList.add("toast-message");
    message.append(options.message);

    // toast content wrapper (wrapper for title and message)
    content.classList.add("toast-content-wrapper");
    content.append(message);

    toastBody.append(content);
    // end main content

    // close button
    if (options.closeButton) {
      closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.classList.add("toast-close-button");
      closeButton.innerHTML = "&#10006;";
      toastBody.append(closeButton);
    }

    // progress bar
    if (options.progressBar.show && options.duration >= 0) {
      progressBar = document.createElement("div");
      progressBar.className += "progress-bar ";
      options.progressBar.classList
        ? (progressBar.className += options.progressBar.classList)
        : (progressBar.style.backgroundColor = "currentColor");
      progressBar.style.animationDuration = options.duration + "ms";
      toastBody.append(progressBar);
    }

    // toast wrapper
    toastWrapper.classList.add("toast-wrapper");
    toastWrapper.classList.add(options.position.x);
    toastWrapper.style.zIndex = options.position.z; // z-index
    toastWrapper.style.transitionProperty = "all";
    toastWrapper.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 0.2, 1)";
    toastWrapper.style.transitionDuration = transitionDuration + "ms";
    toastWrapper.appendChild(toastBody);

    let toastMainFunction = {};

    toastMainFunction.createElement = () => {
      // insert element below body
      const newElement = document.body.insertAdjacentElement("afterbegin", toastWrapper);

      // close button on click
      if (options.closeButton) {
        closeButton.addEventListener("click", (event) => {
          event.stopPropagation();
          toastMainFunction.removeElement(newElement);
        });
      }

      // new element transition
      const newElementOffset =
        allElements[options.position.y][allElements[options.position.y].length - 1] !== undefined
          ? parseFloat(allElements[options.position.y][allElements[options.position.y].length - 1].style[options.position.y])
          : offset;
      toastWrapper.style[options.position.y] = newElementOffset + "px";

      // push new element
      allElements[options.position.y].push(newElement);

      // adjust position of previous elements
      allElements[options.position.y].slice(0, allElements[options.position.y].length - 1).forEach((element) => {
        const currentPos = parseFloat(element.style[options.position.y]);
        element.style[options.position.y] = `${currentPos + newElement.offsetHeight + offset}px`;
      });

      // auto remove function
      toastMainFunction.autoRemove(newElement);
    };

    toastMainFunction.removeElement = (element) => {
      const index = allElements[options.position.y].indexOf(element);
      const removedHeight = element.offsetHeight;

      // opacity transition
      element.style.opacity = "0";

      // Remove current element from allElements
      allElements[options.position.y].splice(index, 1);

      // Delaying remove current element from DOM for opacity transition effect
      setTimeout(() => {
        // remove element from DOM
        element.remove();

        // adjust position of previous elements
        allElements[options.position.y].slice(0, index).forEach((toastElement) => {
          const currentPos = parseFloat(toastElement.style[options.position.y] || 0);
          toastElement.style[options.position.y] = `${currentPos - removedHeight - offset}px`;
        });
      }, transitionDuration / 2);
    };

    toastMainFunction.autoRemove = (element) => {
      // remove element using duration
      if (options.duration >= 0 && !options.progressBar.show) {
        setTimeout(() => {
          toastMainFunction.removeElement(element);
        }, options.duration);
      }
      // remove element using progress bar
      if (options.duration >= 0 && options.progressBar.show) {
        progressBar.addEventListener("animationend", (event) => {
          event.stopPropagation();

          progressBar.style.opacity = 0;

          toastMainFunction.removeElement(element);
        });
      }
    };

    return toastMainFunction.createElement();
  };

  return toastMessage;
}

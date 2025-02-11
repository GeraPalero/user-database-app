import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchInputActive, setIsSearchInputActive] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [timeOutId, setTimeOutId] = useState<number | null>(null);

  const searchButtonHandler = () => {
    if (!isSearchInputActive) {
      setIsSearchInputActive(true);
    } else if (searchInput != "") {
      searchUser();
    } else {
      setIsSearchInputActive(false);
    }
  };

  const searchUser = () => {
    setIsSearchInputActive(false);
    console.log("searching");
    //the logic for searching here
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchInputActive(false);
    } else if (e.key === "Enter") {
      searchUser();
    }
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (searchButtonRef.current && searchButtonRef.current.contains(e.relatedTarget)) return;

    setIsSearchInputActive(false);
  };

  useEffect(() => {
    const showSearchBar = () => {
      searchBarRef.current?.classList.add("search-bar-active");

      const id = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.style.display = "block";
          searchInputRef.current.focus();
        }
      }, 500);

      setTimeOutId(id);
    };

    const hideSearchBar = () => {
      setSearchInput("");
      if (searchInputRef.current) {
        searchInputRef.current.style.display = "none";
      }

      timeOutId && clearTimeout(timeOutId);
      setTimeOutId(null);

      if (searchBarRef.current) {
        searchBarRef.current.classList.remove("search-bar-active");
      }
    };

    if (isSearchInputActive) {
      showSearchBar();
    } else {
      hideSearchBar();
    }
  }, [isSearchInputActive]);

  return (
    <>
      <div className="search-bar-container">
        <div ref={searchBarRef} className="search-bar">
          <input ref={searchInputRef} className="search-input" type="text" value={searchInput} onKeyDown={keyPressHandler} onChange={inputChangeHandler} placeholder="User search" onBlur={onBlurHandler} />
          <button ref={searchButtonRef} className="search-button" onClick={searchButtonHandler}>
            ⌕
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

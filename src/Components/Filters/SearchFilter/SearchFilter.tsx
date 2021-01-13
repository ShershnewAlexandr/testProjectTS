import * as React from "react";
import classnames from "classnames";
import * as Rx from 'rxjs';
import { 
  pluck,
  debounceTime,
  distinctUntilChanged,
  map,
} from "rxjs/operators";
import "./SearchFilter.css";

interface propsType {
  onChange: (search: string) => void,
}

function SearchFilter(props: propsType) {
  const { onChange } = props;
  const inputEl = React.useRef(null);
  React.useEffect(() => {
      Rx.fromEvent(inputEl.current as any, 'input')
      .pipe(
          pluck('target', 'value'),
          map((s:any) => s.trim()),
          distinctUntilChanged(),
          debounceTime(600),
      ).subscribe((value) => {
        onChange(value);
      });
  }, []);
  
  return (
    <input type="text"
      className="search-filter__input"
      placeholder="search"
      ref={inputEl}
    />
  );
}

export { SearchFilter };
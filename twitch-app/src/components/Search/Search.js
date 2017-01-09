import React from 'react';

const Search = (
  { autocomplete, query, onAddClick, onBlur, onWritingText }, input
) => (
  <form className='group' onSubmit={e => e.preventDefault()}>
    <input
      id='search-box'
      list='suggestions'
      type='text' required
      ref={node => input = node}
      onBlur={onBlur}
      onInput={() => onWritingText(input)}
      autoComplete='off'
    />
    <span className='bar'></span>
    <label>Search for channels</label>
    <datalist id='suggestions'>
      {query &&
        autocomplete.get(query) &&
        autocomplete.get(query).suggestions.map((res, i) =>
          <option key={i} value={res} />
      )}
    </datalist>
    <button
      className='btn'
      id='add'
      type='submit'
      onClick={e => onAddClick(e, input)}
    >
      <i className="fa fa-search" aria-hidden="true"></i>
    </button>
  </form>
);

export default Search;

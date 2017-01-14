import React, { PropTypes } from 'react';
import './Search.sass';

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
    <span className='bar' />
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
      <i className='fa fa-search' aria-hidden='true' />
    </button>
  </form>
);

Search.propTypes = {
  autocomplete: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onWritingText: PropTypes.func.isRequired
};

export default Search;

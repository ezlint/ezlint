import React, { useCallback, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { list as listLibraries } from '../../lib/plugins';

// sample taken from https://material-ui.com/components/autocomplete/#multiple-values
const SearchThingy = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = listLibraries.map((v) => v.name);
  const history = useHistory();

  const create = useCallback(() => {
    history.push('/results?selection=' + selectedOptions.join(','));
  }, [history, selectedOptions]);

  return (
    <Grid container item alignItems="flex-end" justify="center" spacing={2}>
      <Grid item xs={7}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={(option) => option}
          onChange={(e, values) => setSelectedOptions(values)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Framework/library/plugin/..."
            />
          )}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={create}
          disabled={selectedOptions.length === 0}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchThingy;

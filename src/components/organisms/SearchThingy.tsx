import React, { useCallback, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { list as listLibraries } from '../../lib/plugins';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'width': 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  })
);

// sample taken from https://material-ui.com/components/autocomplete/#multiple-values
const SearchThingy = () => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = listLibraries.map((v) => v.name);
  const history = useHistory();

  const create = useCallback(() => {
    history.push('/results?selection=' + selectedOptions.join(','));
  }, [history, selectedOptions]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Create ESLint configuration for your project
      </Typography>
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
      <Button
        variant="contained"
        color="primary"
        onClick={create}
        disabled={selectedOptions.length === 0}
      >
        Create
      </Button>
    </div>
  );
};

export default SearchThingy;

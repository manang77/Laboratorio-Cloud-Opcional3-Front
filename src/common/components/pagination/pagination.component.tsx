import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

interface Props {
  pages: number;
  currentPage: number;
  setPageContainer: (newPage: number) => void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const ItemsPagination: React.FC<Props> = props => {
  const classes = useStyles();
  const { pages, currentPage, setPageContainer } = props;
  // const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //setPage(value);
    setPageContainer(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        count={pages}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

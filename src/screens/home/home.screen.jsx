import { Box } from "@mui/material";
import Loader from "components/loader/loader";
import { ComingZoon } from "imports/components.imports";
import { useEffect } from "react";
import { useSetState } from "utils/functions.utils";

const Home = () => {
  const [state, setState] = useSetState({
    loading: true,
    data: {},
  });

  useEffect(() => {
    setTimeout(() => {
      setState({ loading: false });
    }, 2000);
  }, [setState]);

  return (
    <Box sx={{ flex: 1, height: "100vh", p: 2 }}>
      {!state.loading ? (
        <Box sx={{ flex: 1, height: "100%" }}>
          <ComingZoon />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Home;

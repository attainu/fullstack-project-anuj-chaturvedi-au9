import React, { useEffect, useContext, Fragment } from "react";
import Loader from "../../img/loader1.gif";
import ElementItem from "./ElementItem";
import '../../App.css'
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import ElementContext from "../../context/element/elementContext";
import clearSelected from "../../utils/clearSelected";
import downloadAllCode from "../../utils/downloadAllCode";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Element = ({uncheckBox}) => {
  const classes = useStyles();

  const elementContext = useContext(ElementContext);
  const { getElements, elements,filtered } = elementContext;

  useEffect(() => {
    if(elements === null){
      getElements();
    };
    clearSelected();

  }, []);

  if (elements === null) {
    return <div className="loading"><img src={Loader}></img> </div>;
  }
  return (
    <Fragment>
    <Container maxWidth='lg'>

      <div className={classes.root}>
        {filtered === null
          ? elements.map((element) => (
            <ElementItem
              JSCode={element.JSCode}
              HTMLCode={element.HTMLCode}
              CSSCode={element.CSSCode}
              name={element.name}
              img={element.screenshot.data}
              key={element._id}
              id={element._id}
              clearCheckBox={uncheckBox}
            />
          )):  filtered.map((element) => (
              <ElementItem
              JSCode={element.JSCode}
              HTMLCode={element.HTMLCode}
              CSSCode={element.CSSCode}
                name={element.name}
                img={element.screenshot.data}
                key={element._id}
                id={element._id}
              />
            ))}
      </div>
    </Container>
    </Fragment>
  );
};

export default Element;

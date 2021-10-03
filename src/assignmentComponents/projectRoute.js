import React from 'react'
import {Switch,Route} from 'react-router-dom';

//components import
import Category from './category';
import Company from './company';
import SingleCategory from './singleCategory';
import SingleCompany from './singleCompany';


const ProjectRoute = (props) => {
    const {} = props;
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" component={Category} exact></Route>
                <Route path="/company" component={Company} exact></Route>
                <Route path="/category/:id" component={SingleCategory} exact></Route>
                <Route path="/company/:id" component={SingleCompany} exact></Route>
            </Switch>
        </React.Fragment>
    )
}

export default ProjectRoute

import React, { useState } from "react";
import { userEvent, render } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, useHistory } from 'react-router-dom';
import TemplateEditor from '../../src/TemplateEditor';

describe("<TemplateEditor />", () => {
  it("renders without crash", () => {
    render(<Router><TemplateEditor /></Router>);
  });
  /*it("renders home page content", () => {
    const display = render(<Router><TemplateEditor /></Router>);
    //...
  });*/
});
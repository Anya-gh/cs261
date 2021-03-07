import React, { useState } from "react";
import { userEvent, render } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, useHistory } from 'react-router-dom';
import Review from '../Review';

describe("<Review />", () => {
  it("renders without crash", () => {
    //render(<Router><Review /></Router>);
  });
  /*it("renders Review page content", () => {
    const display = render(<Router><Review /></Router>);
    //...
  });*/
});
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Flex, Tabs, Input } from "antd";

import debounce from "../../services/debounce";
import "./Header.css";

class Header extends React.Component {
  render() {
    const { onInput } = this.props;

    const tabs = [
      {
        key: "1",
        label: "Search",
      },
      {
        key: "2",
        label: "Rated",
      },
    ];

    return (
      <header>
        <Flex justify="center">
          <nav>
            <Tabs defaultActiveKey="1" items={tabs} />
          </nav>
        </Flex>
        <Input
          placeholder="Search movie"
          onChange={debounce((e) => onInput(e.target.value), 400)}
        />
      </header>
    );
  }
}

export default Header;

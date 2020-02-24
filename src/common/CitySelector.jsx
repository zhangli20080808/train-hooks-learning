/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./CitySelector.css";

const HotCityItem = memo(function HotCityItem(props) {
  const { name, onClick } = props;
  return (
    <div className="citylist_item" onClick={() => onClick(name)}>
      {name}
    </div>
  );
});

//热门城市
const HotCitySection = memo(function HotCitySection(props) {
  const { hotCities, onSelect } = props;
  return (
    <div className="citylist_shortlistcontainer">
      <h3 className="title">热门</h3>
      {hotCities.map(item => {
        return (
          <HotCityItem
            key={item.name}
            name={item.name}
            onClick={onSelect}
          ></HotCityItem>
        );
      })}
    </div>
  );
});

//搜索结果条目组件
const SuggestItem = memo(function SuggestItem(props) {
  const { name, onClick } = props;
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

const Suggest = memo(function Suggest(props) {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        console.log(result);

        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: searchKey }];
    }
    return result;
  });

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            ></SuggestItem>
          );
        })}
      </ul>
    </div>
  );
});

//城市条目
const CityItem = memo(function CityItem(props) {
  const { name, onSelect } = props;
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});

const CitySection = memo(function CitySection(props) {
  const { title, cities = [], onSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
});

const CityList = memo(function CityList(props) {
  const {
    sections: { cityList, hotCities },
    onSelect,
    toAlpha
  } = props;
  return (
    <div className="city-list">
      <HotCitySection hotCities={hotCities} onSelect={onSelect} />
      <div className="city-cate">
        {cityList.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphaBeta.map(alpha => {
          return (
            <AlphaIndex
              key={alpha}
              alpha={alpha}
              onClick={toAlpha}
            ></AlphaIndex>
          );
        })}
      </div>
    </div>
  );
});

// 26字母
const AlphaIndex = memo(function AlphaIndex(props) {
  const { alpha, onClick } = props;
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

// 构造拥有26个字母的数据
const alphaBeta = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

const CitySelector = memo(function CitySelector(props) {
  const { onBack, show, cityData, isLoading, fetchCityData, onSelect } = props;
  const [searchKey, setSearchKey] = useState("");
  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [show, cityData, isLoading]);

  const handleSearch = useCallback(key => {
    onSelect(key);
    setSearchKey("");
  });

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  }, []);

  //loading处理和错误处理
  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>;
    }
    if (cityData && cityData.cityList) {
      return (
        <CityList sections={cityData} onSelect={onSelect} toAlpha={toAlpha} />
      );
    }
    return <div>error</div>;
  };

  /** 解决ios 字体小于16px自动缩放问题 */
  const handleInputMouseDown = useCallback(e => {
    e.target.style.fontSize = "16px"; // mouse down时，把字体改为16px，使得ios不会自动放大页面
  }, []);

  /** 解决ios 字体小于16px自动缩放问题 */
  const handleInputFocus = useCallback(e => {
    e.target.style.fontSize = ""; // focus时，把字体恢复为原先的字体
  }, []);
  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
            onMouseDown={handleInputMouseDown.bind(this)}
            onFocus={handleInputFocus.bind(this)}
          />
        </div>
        <i
          onClick={() => setSearchKey("")}
          className={classnames("search-clean", {
            hidden: key.length === 0
          })}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => handleSearch(key)}></Suggest>
      )}
      {outputCitySections()}
    </div>
  );
});

export default CitySelector;

CityItem.prototype = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

CitySection.prototype = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};
CityList.prototype = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  // fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

AlphaIndex.prototype = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
SuggestItem.prototype = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

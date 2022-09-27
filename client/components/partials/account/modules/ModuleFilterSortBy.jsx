import { Button, DatePicker, Tooltip } from 'antd'
import React from 'react'

class ModuleFilterSortBy extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 'year', year: '', month: '', weeek: '', day: '' }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleFilterChange(event) {
    this.setState({ value: event.target.value })
  }
  handleChange(date) {}

  render() {
    return (
      <div className='ps-form-chart'>
        <div className='filter-container'>
          <div className='ps-form-element'>
            <select
              className='form-control'
              value={this.state.value}
              onChange={this.handleFilterChange}
            >
              <option value='year'>Year</option>
              <option value='month'>Month</option>
              <option value='week'>Week</option>
              <option value='day'>Day</option>
            </select>
          </div>
          <React.Fragment>
            {this.state.value === 'year' ? (
              <div className='ps-form-element'>
                <DatePicker
                  className='form-control'
                  picker='year'
                  onChange={this.handleChange}
                />
              </div>
            ) : (
              <React.Fragment>
                {this.state.value === 'month' ? (
                  <div className='ps-form-element'>
                    <DatePicker
                      className='form-control'
                      picker='month'
                      onChange={this.handleChange}
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    {this.state.value === 'week' ? (
                      <div className='ps-form-element'>
                        <DatePicker
                          className='form-control'
                          picker='week'
                          onChange={this.handleChange}
                        />
                      </div>
                    ) : (
                      <React.Fragment>
                        {this.state.value === 'day' ? (
                          <div className='ps-form-element'>
                            <DatePicker
                              className='form-control'
                              onChange={this.handleChange}
                            />
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
          <div className='buttonDiv'>
            <Button style={{ height: '50px' }}>
              <i className='icon-funnel'></i>Apply Filter
            </Button>
          </div>
        </div>
        <div className='labelDiv'>
          <Tooltip title='Total Sale' color={'blue'}>
            <Button type={'primary'} style={{ height: '50px' }}>
              Total Sale: ${" "}
            </Button>
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default ModuleFilterSortBy

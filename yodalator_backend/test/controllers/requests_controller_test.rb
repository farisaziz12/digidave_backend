require 'test_helper'

class RequestsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get requests_index_url
    assert_response :success
  end

end

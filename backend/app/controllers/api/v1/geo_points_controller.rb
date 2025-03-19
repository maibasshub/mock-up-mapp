module Api
  module V1
    class GeoPointsController < ApplicationController
      def index
        geo_points = GeoPoint.all

        render json: {
          geo_points: geo_points
        }, status: :ok
      end

      def show
        @geo_point = GeoPoint.find(params[:id])

        render json: {
          geo_point: @geo_point
        }, status: :ok
      end
    end
  end
end

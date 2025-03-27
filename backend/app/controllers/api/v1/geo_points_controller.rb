module Api
  module V1
    class GeoPointsController < ApplicationController

      def index
        # 表示する地図の座標を受け取り、その範囲内のポイントのみを返す
        if params[:ne_lat] && params[:ne_lng] && params[:sw_lat] && params[:sw_lng]
          bbox = [
            params[:sw_lng], params[:sw_lat],
            params[:ne_lng], params[:ne_lat]
          ]
          geo_points = GeoPoint.where(
            "ST_Within(lonlat::geometry, ST_MakeEnvelope(?, ?, ?, ?, 4326))",
            *bbox
          )
        else
          geo_points = GeoPoint.all
        end

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

module Api
  module V1
    class McdonaldsPointsController < ApplicationController

      def index
        # 表示する地図の座標を受け取り、その範囲内のポイントのみを返す
        if params[:ne_lat] && params[:ne_lng] && params[:sw_lat] && params[:sw_lng]
          bbox = [
            params[:sw_lng], params[:sw_lat],
            params[:ne_lng], params[:ne_lat]
          ]
          mcdonalds_points = McdonaldsPoint.where(
            "ST_Within(geography::geometry, ST_MakeEnvelope(?, ?, ?, ?, 4326))",
            *bbox
          )
        else
          mcdonalds_points = McdonaldsPoint.all
        end

        render json: {
          mcdonalds_points: mcdonalds_points
        }, status: :ok
      end

      def show
        @mcdonalds_points = McdonaldsPoint.find(params[:id])

        render json: {
          mcdonalds_points: @mcdonalds_points
        }, status: :ok
      end
    end
  end
end
